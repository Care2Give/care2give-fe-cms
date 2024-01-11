import Body from "@/components/email-editor/Body";
import Subject from "@/components/email-editor/Subject";
import Header from "@/components/email-editor/[id]/Header";
import Layout from "@/components/layout";
import useEmailEditorStore from "@/stores/useEmailEditorStore";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import TiptapLink from "@tiptap/extension-link";

export default function ViewOnlyEmailPage() {
  const router = useRouter();
  const { emails } = useEmailEditorStore();
  const { id } = router.query;
  const email = emails.find((email) => email.id === id);

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
      TiptapLink.configure({
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

  if (!email) return null;

  return (
    <Layout>
      <Header />
      <Subject editor={subjectEditor} subject={email.subject} />
      <Body editor={bodyEditor} body={email.content} />
    </Layout>
  );
}
