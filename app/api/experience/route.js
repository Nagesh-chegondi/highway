import {experiences} from "../../data/product.js"
import { NextResponse } from "next/server.js";
export async function GET(request) {
  return NextResponse.json(experiences);
}

