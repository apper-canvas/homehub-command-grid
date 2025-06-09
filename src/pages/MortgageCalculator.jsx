import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: '',
    downPayment: '',
    loanTerm: '30',
    interestRate: '',
    propertyTax: '',
    homeInsurance: '',
    pmi: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateMortgage = () => {
    const homePrice = parseFloat(formData.homePrice) || 0;
    const downPayment = parseFloat(formData.downPayment) || 0;
    const loanTerm = parseInt(formData.loanTerm) || 30;
    const interestRate = parseFloat(formData.interestRate) || 0;
    const propertyTax = parseFloat(formData.propertyTax) || 0;
    const homeInsurance = parseFloat(formData.homeInsurance) || 0;
    const pmi = parseFloat(formData.pmi) || 0;

    if (homePrice === 0 || interestRate === 0) {
      return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly principal and interest
    const monthlyPI = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Monthly taxes, insurance, and PMI
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = pmi / 12;

    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;
    const totalCost = homePrice + totalInterest + (propertyTax * loanTerm) + (homeInsurance * loanTerm) + (pmi * loanTerm);

    setResults({
      monthlyPayment: totalMonthlyPayment,
      principalAndInterest: monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      loanAmount,
      totalInterest,
      totalCost,
      downPaymentPercent: (downPayment / homePrice) * 100
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
          Mortgage Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your monthly mortgage payments and see how different factors affect your home affordability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-primary mb-6 flex items-center space-x-2">
            <ApperIcon name="Calculator" size={20} />
            <span>Loan Details</span>
          </h2>

          <div className="space-y-6">
            {/* Home Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="500,000"
                  value={formData.homePrice}
                  onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="100,000"
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              {formData.homePrice && formData.downPayment && (
                <p className="text-sm text-gray-600 mt-1">
                  {((parseFloat(formData.downPayment) / parseFloat(formData.homePrice)) * 100).toFixed(1)}% of home price
                </p>
              )}
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term
              </label>
              <select
                value={formData.loanTerm}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  placeholder="6.5"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Monthly Costs</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Tax (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="6,000"
                      value={formData.propertyTax}
                      onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Insurance (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="1,200"
                      value={formData.homeInsurance}
                      onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PMI (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="2,400"
                      value={formData.pmi}
                      onChange={(e) => handleInputChange('pmi', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Usually required if down payment is less than 20%
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateMortgage}
              className="w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Calculator" size={18} />
              <span>Calculate Payment</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {results ? (
            <>
              {/* Monthly Payment Breakdown */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-primary mb-6 flex items-center space-x-2">
                  <ApperIcon name="CreditCard" size={20} />
                  <span>Monthly Payment</span>
                </h2>

                <div className="space-y-4">
                  {/* Total Monthly Payment */}
                  <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total Monthly Payment</span>
                      <span className="text-2xl font-bold text-secondary">
                        {formatCurrencyDecimal(results.monthlyPayment)}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Principal & Interest</span>
                      <span className="font-medium">{formatCurrencyDecimal(results.principalAndInterest)}</span>
                    </div>
                    {results.monthlyTax > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">Property Tax</span>
                        <span className="font-medium">{formatCurrencyDecimal(results.monthlyTax)}</span>
                      </div>
                    )}
                    {results.monthlyInsurance > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">Home Insurance</span>
                        <span className="font-medium">{formatCurrencyDecimal(results.monthlyInsurance)}</span>
                      </div>
                    )}
                    {results.monthlyPMI > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">PMI</span>
                        <span className="font-medium">{formatCurrencyDecimal(results.monthlyPMI)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
                  <ApperIcon name="PieChart" size={18} />
                  <span>Loan Summary</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                    <div className="text-xl font-bold text-primary">
                      {formatCurrency(results.loanAmount)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Down Payment</div>
                    <div className="text-xl font-bold text-success">
                      {formatCurrency(parseFloat(formData.downPayment) || 0)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {results.downPaymentPercent.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                    <div className="text-xl font-bold text-warning">
                      {formatCurrency(results.totalInterest)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                    <div className="text-xl font-bold text-error">
                      {formatCurrency(results.totalCost)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Affordability Insights */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
                  <ApperIcon name="TrendingUp" size={18} />
                  <span>Affordability Insights</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Info" size={16} className="text-accent" />
                      <span className="text-sm font-medium">Recommended Max Payment</span>
                    </div>
                    <span className="text-sm text-gray-600">28% of gross income</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-medium">Good Down Payment</span>
                    </div>
                    <span className="text-sm text-gray-600">20% or more</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm font-medium">Consider Emergency Fund</span>
                    </div>
                    <span className="text-sm text-gray-600">3-6 months expenses</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ApperIcon name="Calculator" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calculate Your Mortgage</h3>
              <p className="text-gray-600">
                Enter your loan details to see your monthly payment breakdown and affordability insights.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MortgageCalculator;