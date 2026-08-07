"use client";

import { useState, useMemo } from "react";
import { FaRupeeSign, FaPercentage, FaCalendarAlt } from "react-icons/fa";

import styles from "./EMICalculator.module.css";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emiData = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      emi: emi || 0,
      totalAmount,
      totalInterest,
    };
  }, [loanAmount, interestRate, tenure]);

  return (
    <section className={styles.emiSection}>
      <div className="container">
        <div className={styles.emiCard}>
          <div className="row g-5 align-items-center">

            {/* Left Side */}
            <div className="col-lg-6">
              <span className={styles.badge}>
                EMI Calculator
              </span>

              <h2 className={styles.title}>
                Calculate Your Home Loan EMI
              </h2>

              {/* Loan Amount */}
              <div className={styles.inputBox}>
                <label>
                  <FaRupeeSign />
                  Loan Amount
                </label>

                <div className={styles.value}>
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </div>

                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>

              {/* Interest Rate */}
              <div className={styles.inputBox}>
                <label>
                  <FaPercentage />
                  Interest Rate (%)
                </label>

                <div className={styles.value}>
                  {interestRate}%
                </div>

                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>

              {/* Tenure */}
              <div className={styles.inputBox}>
                <label>
                  <FaCalendarAlt />
                  Loan Tenure
                </label>

                <div className={styles.value}>
                  {tenure} Years
                </div>

                <input
                  type="range"
                  min="1"
                  max="40"
                  value={tenure}
                  onChange={(e) =>
                    setTenure(Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="col-lg-6">
              <div className={styles.resultCard}>
                <div className={styles.resultItem}>
                  <span>Monthly EMI</span>
                  <h3>
                    ₹{" "}
                    {Math.round(
                      emiData.emi
                    ).toLocaleString("en-IN")}
                  </h3>
                </div>

                <div className={styles.resultItem}>
                  <span>Total Interest</span>
                  <h4>
                    ₹{" "}
                    {Math.round(
                      emiData.totalInterest
                    ).toLocaleString("en-IN")}
                  </h4>
                </div>

                <div className={styles.resultItem}>
                  <span>Total Payment</span>
                  <h4>
                    ₹{" "}
                    {Math.round(
                      emiData.totalAmount
                    ).toLocaleString("en-IN")}
                  </h4>
                </div>

                <div className={styles.loanInfo}>
                  EMI is calculated using the
                  reducing balance method.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}