import OpenAI from 'openai';
import { config } from '../config';
import { prisma } from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    if (config.openai.apiKey) {
      this.openai = new OpenAI({ apiKey: config.openai.apiKey });
    }
  }

  async generateCaption(
    userId: string,
    imageDescription: string,
    tone: string = 'casual',
    includeHashtags: boolean = true
  ) {
    if (!this.openai) {
      throw new AppError('AI features not configured', 503);
    }

    try {
      const prompt = `Generate 3 Instagram captions for a post about: ${imageDescription}. 
      Tone: ${tone}. 
      ${includeHashtags ? 'Include relevant hashtags.' : 'Do not include hashtags.'}
      Return only the captions, one per line.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
      });

      const captions = completion.choices[0].message.content
        ?.split('\n')
        .filter((c) => c.trim()) || [];

      // Save to database
      await prisma.aISuggestion.create({
        data: {
          userId,
          suggestionType: 'caption',
          content: JSON.stringify(captions),
        },
      });

      return captions;
    } catch (error) {
      throw new AppError('Failed to generate captions', 500);
    }
  }

  async suggestHashtags(userId: string, content: string, niche?: string) {
    if (!this.openai) {
      throw new AppError('AI features not configured', 503);
    }

    try {
      const prompt = `Suggest 10-15 relevant Instagram hashtags for this content: ${content}
      ${niche ? `Niche: ${niche}` : ''}
      Return only hashtags, comma-separated.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      });

      const hashtags = completion.choices[0].message.content
        ?.split(',')
        .map((h) => h.trim()) || [];

      // Save to database
      await prisma.aISuggestion.create({
        data: {
          userId,
          suggestionType: 'hashtag',
          content: JSON.stringify(hashtags),
        },
      });

      return hashtags;
    } catch (error) {
      throw new AppError('Failed to suggest hashtags', 500);
    }
  }

  async analyzeContent(userId: string, content: string) {
    if (!this.openai) {
      return {
        sentiment: 'neutral',
        suggestions: ['Enable AI features for detailed analysis'],
      };
    }

    // Placeholder implementation
    return {
      sentiment: 'positive',
      engagement_potential: 'high',
      suggestions: [
        'Add more emojis',
        'Include a call-to-action',
        'Use trending hashtags',
      ],
    };
  }

  async getGrowthTips(userId: string) {
    const tips = [
      'Post consistently at your best performing times',
      'Engage with your audience in the first hour after posting',
      'Use a mix of content types (photos, videos, reels)',
      'Collaborate with accounts in your niche',
      'Use relevant hashtags (10-15 per post)',
    ];

    return tips;
  }

  async getSuggestionsHistory(
    userId: string,
    type?: string,
    limit: number = 20
  ) {
    const where: any = { userId };
    if (type) {
      where.suggestionType = type;
    }

    const suggestions = await prisma.aISuggestion.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return suggestions;
  }
}

export const aiService = new AIService();
