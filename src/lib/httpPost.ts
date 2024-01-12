const httpPost = async (url: string, token: string | null, body: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  return data;
};
export default httpPost;
