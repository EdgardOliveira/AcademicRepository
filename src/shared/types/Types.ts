enum Status {
  "ACTIVE",
  "INACTIVE",
}

enum Publication {
  "PENDING",
  "APPROVED",
  "FAILED",
}

export interface IResultsProps {
  success: boolean;
  message: string;
  data: [];
  error: string;
}

export interface IArticleProps {
  id: number;
  authorId: number;
  title: string;
  content?: string;
  knowledgeArea: string;
  pdf: string;
  publication: Publication;
}
