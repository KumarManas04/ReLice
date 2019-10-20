package com.infinitysolutions.relice.Repositories;

import com.infinitysolutions.relice.Model.RetrofitInterface;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.infinitysolutions.relice.Contracts.Contract.BASE_URL;

public class LoginRepository {
    private static LoginRepository mLoginRepository;
    private RetrofitInterface loginService;
    private static final String TAG = "LoginRepository";

    public static LoginRepository getInstance(){
        if(mLoginRepository == null)
            mLoginRepository = new LoginRepository();
        return mLoginRepository;
    }

    private LoginRepository(){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit retrofit = new Retrofit.Builder()
                .client(httpClient.build())
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL)
                .build();
        loginService = retrofit.create(RetrofitInterface.class);
    }

    public void addUser(String userId, String password){

    }
}
