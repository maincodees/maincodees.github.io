package com.maincodees.androidapp.data.repository

import com.maincodees.androidapp.domain.model.LoginResult
import com.maincodees.androidapp.domain.repository.AuthRepository
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor() : AuthRepository {
    override suspend fun login(email: String, password: String): LoginResult {
        val isValid = email.isNotBlank() && password.length >= 6
        return if (isValid) {
            LoginResult(success = true, message = "Login successful")
        } else {
            LoginResult(success = false, message = "Invalid credentials")
        }
    }
}
