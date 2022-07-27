import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  arrPosts: Post[];
  pdfSrc = "";


  constructor(
    private postsService: PostsService,
  ) {
    this.arrPosts = [];
    this.pdfSrc = "";


  }

  async ngOnInit() {
    let response: any = await this.postsService.getAll()
    this.arrPosts = response.result


  }

}
