import fs from "fs";
import path from "path";

export interface StoredThought {
  id: string;
  name: string;
  message: string;
  pinned: boolean;
  created_at: string;
  likes: number;
  dislikes: number;
  replies: any[];
}

const DATA_FILE = path.join(process.cwd(), "data", "thoughts.json");

const defaultThoughts: StoredThought[] = [
  {
    id: "welcome-thought",
    name: "Aditya",
    message: "Welcome to my Wall of Thoughts! Feel free to leave feedback, say hi, or share project ideas.",
    pinned: true,
    created_at: new Date().toISOString(),
    likes: 8,
    dislikes: 0,
    replies: []
  }
];

export function getStoredThoughts(): StoredThought[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultThoughts, null, 2), "utf8");
      return defaultThoughts;
    }

    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return defaultThoughts;
  } catch (error) {
    console.error("Error reading thoughts.json:", error);
    return defaultThoughts;
  }
}

export function saveStoredThoughts(thoughts: StoredThought[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(thoughts, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving to thoughts.json:", error);
  }
}

export function addStoredThought(newThought: StoredThought): void {
  const thoughts = getStoredThoughts();
  thoughts.unshift(newThought);
  saveStoredThoughts(thoughts);
}

export function updateStoredThought(
  id: string,
  updater: (thought: StoredThought) => StoredThought
): StoredThought | null {
  const thoughts = getStoredThoughts();
  const index = thoughts.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updated = updater(thoughts[index]);
  thoughts[index] = updated;
  saveStoredThoughts(thoughts);
  return updated;
}
