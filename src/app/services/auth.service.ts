import { Injectable } from "@angular/core";
import { User } from "../shared/user.interface";

import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user$: Observable<User>;
  private newUser: User = {} as User;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async register(
    email: string,
    password: string,
    nombre: string,
    apellido: string
  ): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      
      this.newUser.email = user.email;
      this.newUser.emailVerified = user.emailVerified;
      this.newUser.displayName = user.displayName;
      this.newUser.uid = user.uid;

      this.newUser.name = nombre;
      this.newUser.last_name = apellido;

      this.updateUserData(this.newUser);
      return this.newUser;
    } catch (error) {
      console.log("Error -> ", error);
      return error.code;
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      //this.updateUserData(user);
      this.newUser.email = user.email;
      this.newUser.emailVerified = user.emailVerified;
      this.newUser.displayName = user.displayName;
      this.newUser.uid = user.uid;

      return this.newUser;
    } catch (error) {
      console.log("Error -> ", error);
      return error.code;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.email}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      name: user.name,
      last_name: user.last_name,
    };

    return userRef.set(data, { merge: true });
  }

  async isEmailVerified(user: User) {
    return user.emailVerified === true ? true : false;
  }

  public async getUserdata(email: string){
    let data
    await this.afs
      .collection("users")
      .doc(email)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          data = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return data;
  }
}
