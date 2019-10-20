package com.infinitysolutions.relice.Repositories;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.infinitysolutions.relice.Model.FaceIdResponse;
import com.infinitysolutions.relice.Model.RetrofitInterface;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.infinitysolutions.relice.Contracts.Contract.BASE_URL_1;

public class FaceIdRepository {
    public MutableLiveData<String> faceIdMessage = new MutableLiveData<>();
    private static FaceIdRepository mFaceIdRepository;
    private RetrofitInterface faceIdService;
    private static final String TAG = "FaceIdRepository";

    public static FaceIdRepository getInstance(){
        if(mFaceIdRepository == null)
            mFaceIdRepository = new FaceIdRepository();
        return mFaceIdRepository;
    }

    private FaceIdRepository(){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit retrofit = new Retrofit.Builder()
                .client(httpClient.build())
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL_1)
                .build();

        faceIdService = retrofit.create(RetrofitInterface.class);
    }

    public void postFaceId(final String faceId){
        faceIdService.postFaceId(faceId).enqueue(new Callback<FaceIdResponse>() {
            @Override
            public void onResponse(Call<FaceIdResponse> call, Response<FaceIdResponse> response) {
                if(response.isSuccessful()){
                    Log.d(TAG, "Result success");
                    faceIdMessage.setValue("Success");
                }else{
                    Log.d(TAG, "Result failure: " + response);
                    faceIdMessage.setValue("e");
                }
            }

            @Override
            public void onFailure(Call<FaceIdResponse> call, Throwable t) {
                Log.d(TAG, "Result error");
                faceIdMessage.setValue("e");
            }
        });
    }
}
