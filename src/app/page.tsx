import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebarClient from "@/app/_AppSidebarClient";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { SignedOut } from "@/services/clerk/components/SignInStatus";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar
          collapsible="icon"
          className="overflow-hidden"
        >
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">JOB PORTAL</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SignedOut>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={"/sign-in"}>
                        <LogInIcon />
                        <span>Login In</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SignedOut>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SignedIn>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarUserButton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <main className="flex-1">page main body</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
