import { AuthToken } from './../models/auth-token';
import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { SimpleRant } from "../models/simple-rant";
import { FullRant } from "../models/full-rant";
import { Profile } from "../models/profile";
import { Notification } from './../models/notification';

@Injectable()
export class DevrantService {
  private baseUrl: string;

  constructor (private http: Http) {
    this.baseUrl = "https://www.devrant.io/api";
  }

  getRants (sortMethod = "algo",
            limitCount = "20",
            skipCount = 0): Promise<SimpleRant[]> {

    let params = new URLSearchParams();
    params.set("app", "3");
    params.set("sort", sortMethod);
    params.set("limit", limitCount);
    params.set("skip", skipCount.toString());

    return this.http
      .get(`${this.baseUrl}/devrant/rants`, {search: params})
      .toPromise()
      .then(this.extractRantsData)
      .catch(error => error);
  }

  getRant (id: number): Promise<FullRant> {
    return this.http
      .get(`${this.baseUrl}/devrant/rants/${id}?app=3`)
      .toPromise()
      .then(this.extractRantData)
      .catch(error => error);
  }

  getProfile (id: number): Promise<Profile> {
    return this.http
      .get(`${this.baseUrl}/users/${id}?app=3`)
      .toPromise()
      .then(this.extractProfileData)
      .catch(error => error);
  }
  
  getNotifications(authToken: AuthToken): Promise<Notification> {
    let params = new URLSearchParams();         //TODO: Populate from token
    params.set("app", "3");
    params.set("user_id", "527263");
    params.set("token_id", "581871");
    params.set("token_key", "kCC!3H2TJBLb#!3y2$FxU9r65Eb9ZzAwS3j4dt29");
    params.set("last_time", "1491039465");

    return this.http
      .get(`${this.baseUrl}/users/me/notif-feed`, { search : params })
      .toPromise()
      .then(this.extractNotificationsData)
      .catch(error => error);
  } 

  search (term: string): Promise<SimpleRant[]> {
    let params = new URLSearchParams();
    params.set("app", "3");
    params.set("term", term);

    return this.http
      .get(`${this.baseUrl}/devrant/search`, {search: params})
      .toPromise()
      .then(this.extractSearchData)
      .catch(error => error);
  }

  login (email: string, password: string): Promise<any> {
    let body = new FormData();
    body.append('username', email);
    body.append('password', password);
    body.append('app', "3");
    body.append('plat',"3");

    let options = new RequestOptions();
    return this.http
          .post(`${this.baseUrl}/users/auth-token`, body, options)
          .toPromise();
  }

  private extractRantsData (res: Response) {
    let data: SimpleRant[] = res.json().rants;
    return data || { };
  }

  private extractNotificationsData(res: Response) {
    let data: Notification[] = res.json().data;
    return data || {};
  }

  private extractRantData (res: Response) {
    let data: FullRant = res.json();
    return data || { };
  }

  private extractProfileData (res: Response) {
    let data: Profile = res.json().profile;
    return data || { };
  }

  private extractSearchData (res: Response) {
    let data: SimpleRant[] = res.json().results;
    return data || { };
  }
}