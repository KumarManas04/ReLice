package com.infinitysolutions.relice

import android.Manifest
import android.app.AlertDialog
import android.content.IntentSender
import android.content.pm.PackageManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProviders
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.*
import kotlin.system.exitProcess


class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"
    private lateinit var mainViewModel: MainViewModel
    private lateinit var locationRequest: LocationRequest
    private var locationCallback: LocationCallback? = null
    private var fusedLocationClient: FusedLocationProviderClient? = null
    private val LOCATION_SETTINGS_RESOLVE_REQUEST_CODE = 101
    private val LOCATION_PERMISSION_REQUEST_CODE = 112

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mainViewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        checkAndRequestPermissions()
    }

    private fun checkAndRequestPermissions(){
        if (
            ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_DENIED ||
            ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_DENIED ||
            ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_DENIED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(
                    Manifest.permission.CAMERA, Manifest.permission.ACCESS_COARSE_LOCATION
                    , Manifest.permission.ACCESS_FINE_LOCATION
                ),
                1234
            )
        }else{
            requestCurrentLocation()
        }
    }

    private fun requestPermissionDialog() {
        AlertDialog.Builder(this)
            .setTitle("Camera permission")
            .setMessage("We need camera permission to work. Please grant it!")
            .setPositiveButton("Grant") { _, _ -> mainViewModel.setOpenCamera(true) }
            .setNegativeButton("Close app") { _, _ ->
                finish()
                exitProcess(0)
            }
            .show()
    }

    private fun requestCurrentLocation(){
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M) {
            if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                val permissions = arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION)
                ActivityCompat.requestPermissions(this, permissions, LOCATION_PERMISSION_REQUEST_CODE)
                return
            }
        }

        locationRequest = LocationRequest.create()
        locationRequest.interval = 10000
        locationRequest.fastestInterval = 5000
        locationRequest.priority = LocationRequest.PRIORITY_HIGH_ACCURACY

        val builder = LocationSettingsRequest.Builder().addLocationRequest(locationRequest)

        val client = LocationServices.getSettingsClient(this)
        val task = client.checkLocationSettings(builder.build())
        task.addOnSuccessListener(this) {
            Log.d(TAG, "All settings satisfied")
            getCurrentLocation()
        }

        task.addOnFailureListener(this) { e ->
            Log.d(TAG, "All settings not satisfied")
            if (e is ResolvableApiException) {
                try {
                    Log.d(TAG, "Resolving settings")
                    e.startResolutionForResult(
                        this@MainActivity,
                        LOCATION_SETTINGS_RESOLVE_REQUEST_CODE
                    )
                } catch (sendEx: IntentSender.SendIntentException) {
                    // Ignore the error.
                }

            }
        }
    }

    private fun getCurrentLocation(){
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult?) {
                super.onLocationResult(locationResult)
                if (locationResult == null)
                    return

                for (location in locationResult.locations) {
                    if (location != null) {
                        stopLocationUpdates()
                        val locationContent = "${location.latitude}, ${location.longitude}"
                        mainViewModel.setCurrentLocation(locationContent)
                    }
                }
            }
        }

        fusedLocationClient?.requestLocationUpdates(locationRequest, locationCallback, null)
    }

    private fun stopLocationUpdates() {
        fusedLocationClient?.removeLocationUpdates(locationCallback)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 1234) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                mainViewModel.setOpenCamera(true)
            } else {
                Toast.makeText(this, "Unable to get camera permission", Toast.LENGTH_SHORT).show()
                requestPermissionDialog()
            }
            if(grantResults[1] == PackageManager.PERMISSION_GRANTED &&
                    grantResults[2] == PackageManager.PERMISSION_GRANTED){
                requestCurrentLocation()
            }
        }
        if(requestCode == 123){
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                mainViewModel.setOpenCamera(true)
            }
        }
    }
}