import { Document, Types } from "mongoose";
export type LetterDocument = Letter & Document;
export declare class Letter {
    _id: Types.ObjectId;
    userId?: Types.ObjectId;
    recipientEmail: string;
    encryptedContent: string;
    deliverAt: Date;
    audience: string;
    visibility: string;
    authorName?: string;
    status: string;
    images: string[];
    audio: string[];
    videos: string[];
    files: string[];
    createdAt: Date;
    updatedAt: Date;
    paymentId?: string;
    ipAddress?: string;
}
export declare const LetterSchema: import("mongoose").Schema<Letter, import("mongoose").Model<Letter, any, any, any, any, any, Letter>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Letter, Document<unknown, {}, Letter, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    recipientEmail?: import("mongoose").SchemaDefinitionProperty<string, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    encryptedContent?: import("mongoose").SchemaDefinitionProperty<string, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    deliverAt?: import("mongoose").SchemaDefinitionProperty<Date, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    audience?: import("mongoose").SchemaDefinitionProperty<string, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    visibility?: import("mongoose").SchemaDefinitionProperty<string, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    authorName?: import("mongoose").SchemaDefinitionProperty<string | undefined, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    images?: import("mongoose").SchemaDefinitionProperty<string[], Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    audio?: import("mongoose").SchemaDefinitionProperty<string[], Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    videos?: import("mongoose").SchemaDefinitionProperty<string[], Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    files?: import("mongoose").SchemaDefinitionProperty<string[], Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paymentId?: import("mongoose").SchemaDefinitionProperty<string | undefined, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    ipAddress?: import("mongoose").SchemaDefinitionProperty<string | undefined, Letter, Document<unknown, {}, Letter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Letter & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Letter>;
