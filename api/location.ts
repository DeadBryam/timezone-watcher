export const config = {
  runtime: "edge",
  dynamic: "force-dynamic",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const timezone = url.searchParams.get("tz");

  if (!timezone) {
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API}?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}&location=${timezone}`,
    );

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
