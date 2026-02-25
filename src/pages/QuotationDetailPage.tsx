import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quotationService } from '../services/quotationService';
import { ArrowLeft, Download, Mail, Printer } from 'lucide-react';

const QuotationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: quotation, isLoading } = useQuery({
    queryKey: ['quotation', id],
    queryFn: () => quotationService.getById(Number(id)),
    enabled: !!id,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'sent':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading quotation...</div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Quotation not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/quotations')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quotation {quotation.quotation_number}</h1>
            <p className="text-gray-600 mt-1">
              Created on {new Date(quotation.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Mail className="w-5 h-5" />
            Send Email
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>

      {/* Quotation Preview */}
      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">QUOTATION</h2>
            <p className="text-gray-600 mt-1">{quotation.quotation_number}</p>
          </div>
          <div className="text-right">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(quotation.status)}`}>
              {quotation.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Dates and Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Quote For:</h3>
            <div className="text-gray-700">
              <p className="font-semibold">{quotation.customer?.name}</p>
              <p>{quotation.customer?.email}</p>
              {quotation.customer?.phone && <p>{quotation.customer.phone}</p>}
              {quotation.customer?.company && <p>{quotation.customer.company}</p>}
              {quotation.customer?.address && <p className="mt-2">{quotation.customer.address}</p>}
            </div>
          </div>

          <div className="text-right">
            <div className="mb-4">
              <p className="text-gray-600">Issue Date:</p>
              <p className="font-semibold text-gray-800">
                {new Date(quotation.issue_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Valid Until:</p>
              <p className="font-semibold text-gray-800">
                {new Date(quotation.valid_until).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Unit Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items?.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-right">${Number(item.unit_price).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-semibold">${Number(item.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t pt-4">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold">${Number(quotation.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax:</span>
                <span className="font-semibold">${Number(quotation.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${Number(quotation.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {quotation.notes && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold text-gray-800 mb-2">Notes:</h3>
            <p className="text-gray-700">{quotation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationDetailPage;