/**
 * List of global contexts.
 */

// React Imports
import { createContext } from "react";

/**
 * UserContext
 * 
 * This context is used to store the user data.
 * Structure: {
 *   email: string,
 *   image: string?,
 *   name: string,
 * }
 */
export const UserContext = createContext(null);