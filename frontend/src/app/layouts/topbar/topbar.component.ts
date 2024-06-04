import { Component, OnInit, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageModelService } from 'src/app/account/auth/services/image-model.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedService } from 'src/app/account/auth/services/shared.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {


  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  userConnected ;
  topbarImageUser: string = '';
  image:any
  imgUrl : string | ArrayBuffer  ;
  userRole:any;

  userId:number ;
  isChat:boolean;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
              private authFackservice: AuthfakeauthenticationService,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService ,
              private imageService:SharedService,
              private imageModelService : ImageModelService,
              private sanitizer: DomSanitizer,


             
              ) {
  }


  totalPrice: number = 0;
  totalQuantity: number = 0;



  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    
    this.openMobileMenu = false;
    this.element = document.documentElement;



  
   this.setConnectedUser();
  this.getProfileImage();
  this.getImageTopBar();
  this.loadImage(); 
  this.conditionAfficheChat();
  }



  navigateToChat() {
    const userId = this.userId ;
    this.router.navigate(['/chat', userId]);
  }


  conditionAfficheChat(){
    this.userRole = this.userConnected.role;
    if(this.userRole==='Supervisor' ){
      this.isChat=true
    } else if(this.userRole==='Candidacy'){
      this.isChat=true
    }
  }

  
  loadImage(): void {
    this.imageModelService.getImageByUserId(this.userConnected.id)
      .subscribe(
        (data: any) => {
          if(data!=null){
            this.image = data; 
            const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${this.image.picByte}`);
            this.image.safeUrl = safeUrl; 
            this.imageService.sendImage(this.image.safeUrl);
          }else{
            console.log("image vide ")
          }
           
        },
        error => {
          console.error('Erreur lors du chargement de l\'image:', error);
        }
      );
  }
  


  getImageTopBar(){
    this.imageService.getImage().subscribe((imageData) => {
      this.topbarImageUser = imageData;
     // 
    });
  }
  /*
  {"id":118,"firstname":"nabil","lastname":"daghbari","email":"nabil@gmail.com","role":"ADMINISTRATEUR"}  ====> type JSON 
   {id: 118, firstname: 'nabil', lastname: 'daghbari', email: 'nabil@gmail.com', role: 'ADMINISTRATEUR'}  ====> JavaScript
  */
  
  setConnectedUser() {
    const userConnectedString = localStorage.getItem('UserConnected');
    if (userConnectedString) {
      this.userConnected = JSON.parse(userConnectedString);
      this.userId = this.userConnected.id;
    }
  }
  
  navigationprofil(){ 
    this.userRole = this.userConnected.role;
    if(this.userRole==='ADMINISTRATEUR'){
      this.router.navigate(['/profils/profil_Admin']);
    }else if(this.userRole==='Babysitter'){
      this.router.navigate(['/profils/profil_babysitter']);
    }else if(this.userRole==='Parent'){
      this.router.navigate(['/profils/profil_parent']);  
    }
  }


  getImageProfilUpload():string{
    if (this.imgUrl) {
      return this.imgUrl.toString();
    }

    if(this.userConnected && this.userConnected.sexe){
      if(this.userConnected.sexe.toLowerCase() === 'femme'){
       this.imgUrl = 'assets/images/users/femme.png' ;
        return 'assets/images/users/femme.png';
      }else if(this.userConnected.sexe.toLowerCase() === 'homme'){
       this.imgUrl = 'assets/images/users/homme.png' ;
        return 'assets/images/users/homme.png';
      }

   }
  return  'assets/images/users/default.png';
  
  }



getProfileImage():string{
     if(this.userConnected && this.userConnected.sexe){
        if(this.userConnected.sexe.toLowerCase() === 'femme'){
          return 'assets/images/users/femme.png';
        }else if(this.userConnected.sexe.toLowerCase() === 'homme'){
          return 'assets/images/users/homme.png';
        }

     }
    return  'assets/images/users/default.png'; 
}



  /**
   * Logout the user
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/account/login']);

  }





  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }



}
