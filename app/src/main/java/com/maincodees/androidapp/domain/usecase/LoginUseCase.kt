package com.maincodees.androidapp.domain.usecase

import com.maincodees.androidapp.domain.model.LoginResult
import com.maincodees.androidapp.domain.repository.AuthRepository
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(email: String, password: String): LoginResult {
        return authRepository.login(email, password)
    }
}
