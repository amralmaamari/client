import Header from "@/components/Header";


export default function ArticleLayout({ children }: { children: React.ReactNode }) {
    return (
      < >
        <Header />
          <main className="pl-3 pr-4 w-full"> 
          
            {children}
          </main>
      </>
    );
  }
  