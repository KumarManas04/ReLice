package com.infinitysolutions.relice.Fragments


import android.content.Context.MODE_PRIVATE
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import android.widget.Toast.LENGTH_SHORT
import androidx.navigation.Navigation
import com.infinitysolutions.relice.Contracts.Contract.Companion.PREF_USER_ID
import com.infinitysolutions.relice.Contracts.Contract.Companion.SHARED_PREFS_NAME

import com.infinitysolutions.relice.R
import kotlinx.android.synthetic.main.fragment_login.view.*

class LoginFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val rootView = inflater.inflate(R.layout.fragment_login, container, false)
        val prefs = activity!!.getSharedPreferences(SHARED_PREFS_NAME, MODE_PRIVATE)
        if(prefs.getString(PREF_USER_ID, null) != null){
            Navigation.findNavController(activity!!, R.id.nav_host_fragment).navigate(R.id.action_loginFragment_to_cameraFragment)
        }

        rootView.submit_btn.setOnClickListener {
            val userId = rootView.id_edit_text.text.toString()
            val password = rootView.password_edit_text.text.toString()
            if(userId.isNotEmpty() && password.isNotEmpty()){
                if(userId == "test.email@gmail.com" && password == "abcd1234") {
                    Navigation.findNavController(rootView)
                        .navigate(R.id.action_loginFragment_to_cameraFragment)
                    val editor = prefs.edit()
                    editor.putString(PREF_USER_ID, userId)
                    editor.commit()
                }else{
                    Toast.makeText(activity, "Wrong credentials!", LENGTH_SHORT).show()
                }
            }else{
                Toast.makeText(activity, "Enter something", LENGTH_SHORT).show()
            }
        }
        return rootView
    }
}
