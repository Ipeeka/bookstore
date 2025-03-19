import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private readonly apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly apiKey = 'AIzaSyDtUlD14fO8SiRlP7azSFDBkCzKYUODKXg';

  async getGeminiResponse(query: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: query,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error calling Gemini API', error);
      throw new Error('Error connecting to Gemini API');
    }
  }
}
