import { Controller, Get ,Res,Param} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getIndex(@Res() res){
      res.sendFile('index.html',{root : "public"})
  }
  @Get("static/:fileid")
  async getStatic(@Param('fileid') param, @Res() res ){
      res.sendFile(param,{root : "public"})
  }
  @Get('#/*')
  async getIndexToo(@Res() res){
    res.sendFile('index.html',{root : "public"})
}
}
