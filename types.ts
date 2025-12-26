
/**
 * Core interfaces for the AetherLabs Thermal Suite.
 * Part of the Pulse Coding Assignment.
 */

export interface Review {
  id: string;
  text: string;
  date: string;
  rating: number;
  userName: string;
}

export interface TopicTrend {
  topic: string;
  counts: Record<string, number>; // date string -> count
}

export interface ModuleInfo {
  module: string;
  Description: string;
  Submodules: Record<string, string>; // name -> description
}

export interface VideoMetadata {
  id: string;
  name: string;
  size: string;
  status: 'processing' | 'safe' | 'flagged';
  progress: number;
  sensitivityScore?: number;
  uploadedAt: string;
}

export enum AppSection {
  THERMAL_ANALYTICS = 'Thermal Analytics',
  ASSET_GEN = 'AetherVisuals Lab',
  EXTRACTION_AGENT = 'Extraction Agent',
  RD_PIPELINE = 'R&D Security'
}
