export const config = {
  runtime: "edge",
  dynamic: "force-dynamic",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const timezone = url.searchParams.get("tz");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TIME_API}TimeZone/zone?timeZone=${timezone}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({}), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
