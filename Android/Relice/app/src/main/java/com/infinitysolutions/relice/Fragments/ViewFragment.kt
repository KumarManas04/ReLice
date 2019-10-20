package com.infinitysolutions.relice.Fragments

import android.content.Context.MODE_PRIVATE
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.infinitysolutions.relice.MainViewModel
import com.infinitysolutions.relice.R
import kotlinx.android.synthetic.main.fragment_view.view.*
import android.content.DialogInterface
import android.util.Log
import androidx.appcompat.app.AlertDialog
import android.widget.TextView
import com.infinitysolutions.relice.Contracts.Contract.Companion.PREF_USER_ID
import com.infinitysolutions.relice.Contracts.Contract.Companion.SHARED_PREFS_NAME


class ViewFragment : Fragment() {
    private var subStatus: Int = 0

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val rootView = inflater.inflate(R.layout.fragment_view, container, false)

        val mainViewModel = ViewModelProviders.of(activity!!).get(MainViewModel::class.java)
        initDataBinding(mainViewModel)
        val bitmap = mainViewModel.getImage()
        rootView.image_preview.setImageBitmap(bitmap)

        rootView.submit_btn.setOnClickListener {
            val prefs = activity!!.getSharedPreferences(SHARED_PREFS_NAME, MODE_PRIVATE)
            val userId = prefs.getString(PREF_USER_ID, "")
            mainViewModel.startMatch(userId!!)
        }
        return rootView
    }


    private fun initDataBinding(mainViewModel: MainViewModel){
        val builder = AlertDialog.Builder(activity!!)
        builder.setCancelable(false)
        builder.setView(R.layout.loading_dialog)
        val dialog = builder.create()

        mainViewModel.getPostReportMessage().observe(activity!!, Observer {postReportMessage->
            if(postReportMessage != null){
                if(postReportMessage == "e")
                    showError()
                else
                    showSuccess()
                subStatus++
                mainViewModel.setPostReportMessage(null)
            }
        })

        mainViewModel.getFaceIdMessage().observe(activity!!, Observer {faceIdMessage->
            if(faceIdMessage != null){
                if(faceIdMessage == "e")
                    showError()
                else
                    showSuccess()
                subStatus++
                mainViewModel.setFaceIdMessage(null)
            }
        })

        mainViewModel.getShowError().observe(activity!!, Observer {showError->
            if(showError != null && showError)
                showError()
        })

        mainViewModel.getShowLoading().observe(activity!!, Observer {showLoading->
            if(showLoading == null){
                dialog.dismiss()
            }else{
                dialog.show()
            }
        })
    }

    private fun showSuccess() {
        AlertDialog.Builder(activity!!)
            .setTitle("Success")
            .setCancelable(false)
            .setMessage("Submission successful. Thank you!")
            .setPositiveButton("OK") { _, _ ->
                if(subStatus == 2) {
                    subStatus = 0
                    activity!!.onBackPressed()
                }
            }
            .create()
            .show()
    }

    private fun showError() {
        AlertDialog.Builder(activity!!)
            .setTitle("Error")
            .setMessage("Problem detecting faces. Make sure the child is in the camera frame.")
            .setPositiveButton("OK") { _, _ ->
                if (subStatus == 2) {
                    subStatus = 0
                    activity!!.onBackPressed()
                }
            }
            .create().show()
    }
}
