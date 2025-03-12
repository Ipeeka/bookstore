import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  async askGemini(@Body() body: { query: string }) {
    try {
      const response = await this.geminiService.getGeminiResponse(body.query);
      return response;
    } catch (error) {
      console.error('Error in GeminiController:', error);
      throw error; 
    }
  }
}
