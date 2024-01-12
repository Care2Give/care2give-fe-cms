import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: This is a superuser-only endpoint, should have an additional check
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getAuth(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // const { offset } = req.query;

    const users = user
      ? await clerkClient.users.getUserList({
          // offset: (parseInt(offset as string) || 0) * 10,
          limit: 100,
        })
      : null;

    return res.status(200).json(users);
  } else if (req.method === "PATCH") {
    const { id, role } = JSON.parse(req.body);
    try {
      const updatedUser = await clerkClient.users.updateUser(id, {
        publicMetadata: { role },
      });
      return res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating user" });
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    try {
      const user = await clerkClient.users.getUser(id);
      await clerkClient.users.deleteUser(id);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error deleting user" });
    }
  }
  // } else if (req.method === "POST") {
  //   const { firstName, lastName, emailAddress, password, publicMetadata } =
  //     JSON.parse(req.body);
  //   try {
  //     const newUser = await clerkClient.users.createUser({
  //       firstName,
  //       lastName,
  //       emailAddress,
  //       password,
  //       publicMetadata,
  //     });
  //     return res.status(200).json(newUser);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ error: "Error creating user" });
  //   }
  // }
}
