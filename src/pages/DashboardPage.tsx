import { useQuery } from '@tanstack/react-query';
import { customerService } from '../services/customerService';
import { invoiceService } from '../services/invoiceService';
import { quotationService } from '../services/quotationService';
import { Users, FileText, FilePlus, DollarSign } from 'lucide-react';

const DashboardPage = () => {
  const { data: customers } = useQuery({ queryKey: ['customers'], queryFn: customerService.getAll });
  const { data: invoices } = useQuery({ queryKey: ['invoices'], queryFn: invoiceService.getAll });
  const { data: quotations } = useQuery({ queryKey: ['quotations'], queryFn: quotationService.getAll });

  const totalRevenue = invoices?.reduce((sum, inv) => sum + parseFloat(inv.total.toString()), 0) || 0;

  const stats = [
    {
      title: 'Total Customers',
      value: customers?.length || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Invoices',
      value: invoices?.length || 0,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Total Quotations',
      value: quotations?.length || 0,
      icon: FilePlus,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Invoices</h2>
        {invoices && invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Invoice #</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{invoice.invoice_number}</td>
                    <td className="py-3 px-4">{invoice.customer?.name}</td>
                    <td className="py-3 px-4">${invoice.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No invoices yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;