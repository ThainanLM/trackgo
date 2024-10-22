import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importe o AngularFirestore
import { User } from 'firebase/auth';

export interface Users {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  constructor(
    public ngFireAuth: AngularFireAuth,
    private firestore: AngularFirestore // Adicione o AngularFirestore aqui
  ) {}

  async registerUser(email: string, password: string) {
    const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Salva o nome de usuário no Firestore
    if (user) {
      await this.firestore.collection('users').doc(user.uid).set({
        email: user.email,
      });
    }

    return userCredential;
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async getProfile(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }
}
