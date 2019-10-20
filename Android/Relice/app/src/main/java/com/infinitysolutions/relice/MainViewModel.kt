package com.infinitysolutions.relice

import android.graphics.Bitmap
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.infinitysolutions.relice.Model.FormData
import com.microsoft.projectoxford.face.FaceServiceClient
import com.microsoft.projectoxford.face.FaceServiceClient.FaceAttributeType
import com.microsoft.projectoxford.face.FaceServiceRestClient
import com.microsoft.projectoxford.face.contract.Face
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.lang.Exception
import com.infinitysolutions.relice.Repositories.FaceIdRepository
import com.infinitysolutions.relice.Repositories.ReportRepository


class MainViewModel: ViewModel(){
    private val TAG = "MainViewModel"
    private val reportRepository = ReportRepository.getInstance()
    private val faceIdRepository = FaceIdRepository.getInstance()
    private var postReportMessage = reportRepository.postReportMessage
    private var faceIdMessage = faceIdRepository.faceIdMessage
    private val openCamera = MutableLiveData<Boolean>()
    private val showLoading = MutableLiveData<String?>()
    private val showError = MutableLiveData<Boolean>()
    private var currentLocation: String = ""
    private var image: Bitmap? = null
    private var formData: FormData? = null

    fun getPostReportMessage(): LiveData<String?>{
        return postReportMessage
    }

    fun setPostReportMessage(message: String?){
        postReportMessage.value = message
    }

    fun getFaceIdMessage(): LiveData<String?>{
        return faceIdMessage
    }

    fun setFaceIdMessage(message: String?){
        faceIdMessage.value = message
    }

    fun setCurrentLocation(location: String){
        currentLocation = location
    }

    fun getShowError(): LiveData<Boolean>{
        return showError
    }

    fun getShowLoading(): LiveData<String?>{
        return showLoading
    }

    fun setOpenCamera(value: Boolean){
        openCamera.value = value
    }

    fun getOpenCamera(): LiveData<Boolean>{
        return openCamera
    }

    fun setBitmap(bitmap: Bitmap){
        image = bitmap
    }

    fun getImage(): Bitmap? {
        return image
    }

    fun startMatch(userId: String){
        val apiEndPoint = "https://relice.cognitiveservices.azure.com/face/v1.0"
        val subscriptionKey = "674d6648b56249649069b64cc83ed9a2"
        val faceServiceClient: FaceServiceClient = FaceServiceRestClient(apiEndPoint, subscriptionKey)
        val outputStream = ByteArrayOutputStream()
        if(image != null) {
            image!!.compress(Bitmap.CompressFormat.JPEG, 100, outputStream)
            val inputStream = ByteArrayInputStream(outputStream.toByteArray())
            showLoading.value = "Submitting..."
            showError.value = false
            viewModelScope.launch(Dispatchers.IO) {
                try {
                    val result = faceServiceClient.detect(
                        inputStream,
                        true,
                        false,
                        arrayOf(
                            FaceAttributeType.Age,
                            FaceAttributeType.Hair,
                            FaceAttributeType.Gender
                        )
                    )

                    withContext(Dispatchers.Main) {
                        showLoading.value = null
                    }
                    if (result == null || result.isEmpty()) {
                        withContext(Dispatchers.Main) {
                            showError.value = true
                        }
                    } else {
                        withContext(Dispatchers.Main) {
                            extractData(userId, result[0])
                        }
                    }
                }catch (e: Exception){
                    e.printStackTrace()
                    withContext(Dispatchers.Main) {
                        showLoading.value = null
                    }
                }
            }
        }
    }

    private fun extractData(userId: String, result: Face){
        val faceAttrs = result.faceAttributes
        formData = FormData(
            faceAttrs.age,
            faceAttrs.hair.hairColor[0].color.toString(),
            faceAttrs.gender,
            currentLocation
        )

        Log.d(TAG, formData.toString())
        reportRepository.postReport(formData, result.faceId.toString(), userId)
        faceIdRepository.postFaceId(result.faceId.toString())
    }
}