
import { GoogleGenAI, Type } from "@google/genai";
import { ModuleInfo } from "../types";

/**
 * GeminiService: Central AI orchestration for the AetherLabs Pulse Suite.
 * Handles multimodal generation and structured data extraction using Gemini models.
 */
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    /**
     * SDK Initialization strictly follows the requirement to use process.env.API_KEY.
     */
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  }

  /**
   * Generates high-fidelity marketing assets for AetherSoles.
   * Model: gemini-2.5-flash-image
   * Configuration: High-contrast thermal aesthetic without generic watermarks.
   */
  async generateProductAsset(prompt: string): Promise<string | null> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A professional, world-class high-tech advertisement photo of AetherSoles™ cooling shoe inserts. Environment: ${prompt}. Visual style: futuristic, frosted glass, blue thermal glowing trails, extremely detailed texture, ice crystals. No text, no watermarks.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  /**
   * Performs deep sentiment mapping on product reviews.
   * Model: gemini-3-flash-preview
   * Output: Strictly follows Type.OBJECT schema for reliable UI updates.
   */
  async analyzeThermalFeedback(reviews: string[]) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a thermal performance audit on these AetherSole customer reviews:
      Reviews: ${reviews.join(' | ')}
      Identify sentiment metrics related to cooling efficiency and heat dissipation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mappings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  reviewIndex: { type: Type.INTEGER },
                  topicName: { type: Type.STRING, description: "Metric like Heat Dissipation or Active Cooling" }
                },
                required: ["reviewIndex", "topicName"]
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"mappings":[]}').mappings;
  }

  /**
   * Transforms raw text documentation into a structured module hierarchy.
   * This is a core requirement for the Pulse Assignment extraction agent.
   */
  async extractModulesFromContent(content: string): Promise<ModuleInfo[]> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a senior systems architect. Extract a structured hierarchical module tree from this AetherLabs R&D documentation:
      
      Content:
      ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              module: { type: Type.STRING },
              Description: { type: Type.STRING },
              submoduleItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["name", "description"]
                }
              }
            },
            required: ["module", "Description", "submoduleItems"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '[]');
    return parsed.map((item: any) => ({
      module: item.module,
      Description: item.Description,
      Submodules: (item.submoduleItems || []).reduce((acc: Record<string, string>, sub: any) => {
        acc[sub.name] = sub.description;
        return acc;
      }, {})
    }));
  }

  /**
   * Audits R&D video content for potential security risks.
   * Evaluates names and descriptions for proprietary IP leaks.
   */
  async analyzeVideoSensitivity(name: string, description: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Security Audit Request: Evaluate R&D testing video "${name}" with meta-data: "${description}". Check for proprietary fan blade geometries or phase-change chemical disclosures.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Risk percentage 0-100" },
            status: { type: Type.STRING, description: "One of: safe, processing, flagged" }
          },
          required: ["score", "status"]
        }
      }
    });
    return JSON.parse(response.text || '{"score":0,"status":"safe"}');
  }
}

export const geminiService = new GeminiService();
