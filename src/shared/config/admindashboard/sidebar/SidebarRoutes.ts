/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  LayoutDashboard,
  UserCheck,
  Users,
  UserCog,
  Building2,
  Calendar,
  FileText,
  Receipt,
  FileSearch,
} from 'lucide-react';
import { ISidebarRoutes } from '@/shared/types';

export const SidebarRoutes: ISidebarRoutes[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: UserCheck, label: 'Referrals', href: '/admin/referrals' },
  { icon: Users, label: 'Claimants', href: '/admin/claimants' },
  { icon: UserCog, label: 'Examiners', href: '/admin/examiners' },
  { icon: Building2, label: 'Service Providers', href: '/admin/service-providers' },
  { icon: Calendar, label: 'Schedule', href: '/admin/schedule' },
  { icon: FileText, label: 'Reports', href: '/admin/reports' },
  { icon: Receipt, label: 'Billing & Invoices', href: '/admin/billing-invoices' },
  { icon: FileSearch, label: 'Audit Logs', href: '/admin/audit-logs' },
];