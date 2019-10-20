package com.infinitysolutions.relice.Model

import com.infinitysolutions.relice.Contracts.Contract.Companion.POST_FACE_ID
import com.infinitysolutions.relice.Contracts.Contract.Companion.POST_REPORT
import retrofit2.Call
import retrofit2.Callback
import retrofit2.http.*
import retrofit2.http.POST

interface RetrofitInterface {

    @FormUrlEncoded
    @POST(POST_REPORT)
    fun postReport(
        @Field("face_id") faceId: String,
        @Field("image") image: String,
        @Field("age") age: Double,
        @Field("location") location: String,
        @Field("gender") gender: String,
        @Field("hair_color") hairColor: String,
        @Field("user_id") userId: String
    ): Call<FormResponse>

    @GET(POST_FACE_ID)
    fun postFaceId(
        @Query("faceId") faceId: String
    ): Call<FaceIdResponse>
}