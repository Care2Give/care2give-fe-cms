const httpPostFormData = async (
  url: string,
  token: string | null,
  body: FormData
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const data = await res.json();
  return data;
};

export default httpPostFormData;
