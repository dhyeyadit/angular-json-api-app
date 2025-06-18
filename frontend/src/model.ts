export interface Observation {
  id: number;
  name: string;
  datas: SamplingData[];
}

export interface SamplingData {
  samplingTime: string;
  properties: Property[];
}

export interface Property {
  value: string | number | boolean;
  label: string;
}

export interface SummaryObservation {
  samplingTime: string;
  projectName: string;
  constructionCount?: number;
  isConstructionCompleted?: boolean;
  lengthOfRoad?: number;
}
