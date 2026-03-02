package com.maincodees.androidapp.domain.repository

import com.maincodees.androidapp.domain.model.LoginResult

interface AuthRepository {
    suspend fun login(email: String, password: String): LoginResult
}
