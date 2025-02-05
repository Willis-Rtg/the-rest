export async function generateMetadata() {
  return {
    title: "PROLOGUE",
    description: "The 쉼 펜션 전경",
  };
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
