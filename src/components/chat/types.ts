/* ------------------------------------------------------------------ */
/*  Chat widget types & reducer                                        */
/* ------------------------------------------------------------------ */

export type Step =
  | "welcome"
  | "photo"
  | "poolSize"
  | "schedule"
  | "details"
  | "submitting"
  | "result";

export type PoolSize = "10k-20k" | "20k-30k" | "30k+";
export type Schedule = "weekly" | "biweekly";

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ChatState {
  step: Step;
  photo: string | null;       // base64 data-url
  poolSize: PoolSize | null;
  schedule: Schedule | null;
  details: ContactDetails | null;
  monthlyPrice: number | null;
  quoteId: string | null;
  error: string | null;
}

export type ChatAction =
  | { type: "SET_PHOTO"; photo: string }
  | { type: "SET_POOL_SIZE"; poolSize: PoolSize }
  | { type: "SET_SCHEDULE"; schedule: Schedule }
  | { type: "SET_DETAILS"; details: ContactDetails }
  | { type: "SET_PRICE"; price: number }
  | { type: "SET_QUOTE_ID"; quoteId: string }
  | { type: "SET_STEP"; step: Step }
  | { type: "SET_ERROR"; error: string }
  | { type: "RESET" };

export const initialChatState: ChatState = {
  step: "welcome",
  photo: null,
  poolSize: null,
  schedule: null,
  details: null,
  monthlyPrice: null,
  quoteId: null,
  error: null,
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_PHOTO":
      return { ...state, photo: action.photo, step: "poolSize" };
    case "SET_POOL_SIZE":
      return { ...state, poolSize: action.poolSize, step: "schedule" };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.schedule, step: "details" };
    case "SET_DETAILS":
      return { ...state, details: action.details, step: "submitting" };
    case "SET_PRICE":
      return { ...state, monthlyPrice: action.price };
    case "SET_QUOTE_ID":
      return { ...state, quoteId: action.quoteId, step: "result" };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_ERROR":
      return { ...state, error: action.error, step: "details" };
    case "RESET":
      return { ...initialChatState };
    default:
      return state;
  }
}
