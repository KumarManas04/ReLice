package com.infinitysolutions.relice.Repositories;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.infinitysolutions.relice.Model.FormData;
import com.infinitysolutions.relice.Model.FormResponse;
import com.infinitysolutions.relice.Model.RetrofitInterface;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.infinitysolutions.relice.Contracts.Contract.BASE_URL;

public class ReportRepository {
    public MutableLiveData<String> postReportMessage = new MutableLiveData<>();
    private static ReportRepository mReportRepository;
    private RetrofitInterface reportService;
    private static final String TAG = "ReportRepository";

    public static ReportRepository getInstance(){
        if(mReportRepository == null)
            mReportRepository = new ReportRepository();
        return mReportRepository;
    }

    private ReportRepository(){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit retrofit = new Retrofit.Builder()
                .client(httpClient.build())
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL)
                .build();

        reportService = retrofit.create(RetrofitInterface.class);
    }

    public void postReport(FormData data, String faceId, String userId){
        reportService.postReport(
                faceId,
                "image/*",
                data.getAge(),
                data.getLocation(),
                data.getGender(),
                data.getHairColor(),
                userId
        ).enqueue(new Callback<FormResponse>() {
            @Override
            public void onResponse(Call<FormResponse> call, Response<FormResponse> response) {
                if(response.isSuccessful()){
                    Log.d(TAG, "Result success");
                    postReportMessage.setValue("Success");
                }else{
                    postReportMessage.setValue("e");
                }
            }

            @Override
            public void onFailure(Call<FormResponse> call, Throwable t) {
                postReportMessage.setValue("e");
            }
        });
    }
}
