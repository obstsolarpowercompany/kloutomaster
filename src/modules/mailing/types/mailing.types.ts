export interface EmailContext {
  [key: string]: any;
}

export interface EmailJobData {
  to: string;
  subject: string;
  template: string;
  context: EmailContext;
  transporterType: 'general' | 'payment';
}
