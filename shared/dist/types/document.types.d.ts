export interface Document {
    id: string;
    hash: string;
    issuer: string;
    createdAt: string;
}
export interface CreateDocumentRequest {
    hash: string;
}
export interface VerifyDocumentResponse {
    exists: boolean;
    issuer: string | null;
    timestamp: number | null;
}
