export interface GameStats {
  parentEnergy: number; // 0 - 100
  childFocus: number;   // 0 - 100
  familyBond: number;   // 0 - 100
  creativityMovement: number; // 0 - 100
}

export interface ChoiceEffect {
  parentEnergy?: number;
  childFocus?: number;
  familyBond?: number;
  creativityMovement?: number;
}

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
  effect: ChoiceEffect;
  nextNodeId: string;
}

export type NodeType = 'start' | 'story' | 'game_over' | 'success';

export interface GameNode {
  id: string;
  type: NodeType;
  actTitle?: string;
  timeLabel?: string;
  progressPercent: number;
  title?: string;
  text: string;
  image?: string;
  choices: Choice[];
  // For Game Over nodes:
  finalStatsOverview?: {
    childFocus: number;
    familyBond: number;
    parentEnergy: number;
    creativityMovement: number;
  };
  gameOverCommentary?: string;
  // Final ending path tag
  endingPathType?: 'chess' | 'reading' | 'english';
}

export interface HistoryItem {
  nodeId: string;
  selectedChoiceText?: string;
  statsBefore: GameStats;
  statsAfter: GameStats;
}
