import Body from "@/components/email-editor/Body";
import Header from "@/components/email-editor/Header";
import Subject from "@/components/email-editor/Subject";
import Layout from "@/components/layout";
import { Montserrat } from "next/font/google";
import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { dateOptions } from "@/lib/utils";
import useClerkSWR from "@/lib/useClerkSWR";
import EditEmailButton from "@/components/email-editor/EditEmailButton";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useAuth } from "@clerk/nextjs";
import httpPost from "@/lib/httpPost";
import { Skeleton } from "@/components/ui/skeleton";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function EmailEditor() {
  const { data, error, mutate } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/email-editor`
  );

  const { getToken, userId } = useAuth();
  const { setIsEditing } = useEmailEditorStore();

  const subjectEditor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "p-3 border-gray-300 border-2 border-solid rounded text-sm bg-white",
      },
    },
  });
  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https"],
        autolink: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "p-3 border-gray-300 border-2 border-solid rounded text-sm bg-white",
      },
    },
  });

  const handleSubmitEmail = async () => {
    setIsEditing(false);
    const data = {
      subject: subjectEditor?.getHTML(),
      content: bodyEditor?.getHTML(),
      editedBy: userId,
    };
    const res = await httpPost(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/email-editor`,
      await getToken(),
      JSON.stringify(data)
    );
    mutate(res);
  };

  if (error) return null;

  return (
    <Layout>
      <Header />
      <div className="flex flex-col gap-6">
        {data ? (
          <Subject editor={subjectEditor} subject={data.subject} />
        ) : (
          <Skeleton className="w-full h-10 rounded-full mt-8" />
        )}
        {data ? (
          <Body editor={bodyEditor} body={data.content} />
        ) : (
          <Skeleton className="w-full h-24 rounded-full mt-8" />
        )}
      </div>
      {data ? (
        <div
          className={`${montserrat.className} text-xs text-gray-500 flex justify-between items-center`}
        >
          <div>
            <p>
              Last Edited:{" "}
              {new Date(data.updatedAt).toLocaleDateString(
                "en-SG",
                dateOptions
              )}
            </p>
            <p>By: {data.firstName}</p>
          </div>
          <EditEmailButton handleSubmitEmail={handleSubmitEmail} />
        </div>
      ) : (
        <Skeleton className="w-full h-8 rounded-full mt-8" />
      )}
    </Layout>
  );
}
