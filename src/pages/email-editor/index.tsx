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
  const {
    isEditing,
    setIsEditing,
    didSaveContent,
    setDidSaveContent,
    subjectContent,
    bodyContent,
  } = useEmailEditorStore();

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
    setDidSaveContent(true);
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
  if (!data) return <h2>Loading</h2>;

  const { subject, content, updatedAt, firstName } = data;
  return (
    <Layout>
      <Header />
      <div className="flex flex-col gap-6">
        <Subject editor={subjectEditor} subject={subject} />
        <Body editor={bodyEditor} body={content} />
      </div>
      <div
        className={`${montserrat.className} text-xs text-gray-500 flex justify-between items-center`}
      >
        <div>
          <p>
            Last Edited:{" "}
            {new Date(updatedAt).toLocaleDateString("en-SG", dateOptions)}
          </p>
          <p>By: {firstName}</p>
        </div>
        <EditEmailButton handleSubmitEmail={handleSubmitEmail} />
      </div>
    </Layout>
  );
}
