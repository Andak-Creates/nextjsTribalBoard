import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
    {
      headers: {
        "X-Master-Key": process.env.JSONBIN_MASTER_KEY as string,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

// Handle PUT request to update user data in JSONBin
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, fundabilityScore } = body;

    console.log("Received request to update fundability:", body); // Log request body

    // Fetch current data from JSONBin
    const res = await fetch(
      "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
      {
        headers: {
          "X-Master-Key": process.env.JSONBIN_MASTER_KEY as string,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch data from JSONBin");

    const data = await res.json();

    // Ensure data contains the `record` property and it's an array
    if (!data.record || !Array.isArray(data.record)) {
      throw new Error("Invalid data structure in JSONBin");
    }

    // Find and update the user with the given id
    const updatedUsers = data.record.map((user: any) =>
      user.id === id ? { ...user, fundabilityScore } : user
    );

    // Update JSONBin with new data
    const updateRes = await fetch(
      "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
      {
        method: "PUT",
        headers: {
          "X-Master-Key": process.env.JSONBIN_MASTER_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ record: updatedUsers }), // Make sure to send `record` as the top-level key
      }
    );

    if (!updateRes.ok) throw new Error("Failed to update data in JSONBin");

    // Respond with the updated users
    return NextResponse.json({ success: true, updatedUsers });
  } catch (error: any) {
    console.error("Error occurred during PUT request:", error); // Log error to console
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
