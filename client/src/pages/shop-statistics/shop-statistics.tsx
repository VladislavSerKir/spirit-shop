import React, { FC, useState } from "react";
import { EXCEL_TYPE, useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import {
  getShopStatisticsInfo,
  getShopStatisticsPeriodInfo,
} from "../../store/actions/userAction";
import Spinner from "../spinner/spinner";
import GlobalProductStatistics from "../../components/global-product-statistics/global-product-statistics";
import { setShopStatisticsInfoToNull } from "../../store/reducers/serviceReducer";
import { useRouteMatch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../shared/button/button";
import useFarmatDate from "../../hooks/useFormatDate";
import { IShopStatisticsData } from "../../types/store/serviceStoreType";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import GoogleSheetsExport from "../../components/google-sheets-export/google-sheets-export";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";
import { AreaChart } from "../../components/area-chart/area-chart";

const ShopStatistics: FC = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const periodStatistics = useTypedSelector(
    (state) => state.user.periodStatistics
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { formatDate } = useFarmatDate();

  const formatStartDate = formatDate(startDate);
  const formatEndDate = formatDate(endDate);

  const statistics = useTypedSelector(
    (state) => state.service.shopStatisticsData
  );
  const products = useTypedSelector((state) => state.products.products);
  const productStatistics = useTypedSelector(
    (state) => state.service.shopStatisticsData.productStatistics
  );

  const fullProducts = productStatistics?.map((product) => {
    const existProduct = products.find((p) => p.id === product.id);
    return {
      name: existProduct?.name,
      image: existProduct?.image,
      price: existProduct?.price,
      bought: product?.bought,
      revenue: product?.revenue,
      averageRating: product?.averageRating,
      reviewCount: product?.reviewCount,
    };
  });

  const shopStatisticsRequest = useTypedSelector(
    (state) => state.service.shopStatisticsRequest
  );

  React.useEffect(() => {
    dispatch(getShopStatisticsInfo());
    // dispatch(getCharts());

    return () => {
      setShopStatisticsInfoToNull();
    };
  }, [url]);

  const getShopStatisticsHandler = (startDate: string, endDate: string) => {
    dispatch(getShopStatisticsPeriodInfo({ startDate, endDate }));
    // dispatch(getChartsBetweenPeriod({ startDate, endDate }));
  };

  if (shopStatisticsRequest) {
    return <Spinner />;
  }

  const generateExcelFile = (data: any) => {
    const workbook = XLSX.utils.book_new();
    const statisticsSheet = [
      [t("Shop statistic")],
      [t("Main article"), t("Value"), t("Unit")],
    ];

    data.forEach((item: any, i: number) => {
      if (item.name) {
        statisticsSheet.push([item.name, item.value, item.unit, ""]);
      } else if (i === 9) {
        statisticsSheet.push(
          [],
          [t("Product statistic")],
          [
            t("Name"),
            t("Price"),
            t("Bought"),
            t("Revenue"),
            t("Average rating"),
            t("Review count"),
          ],
          [
            item.title,
            item.price,
            item.bought,
            item.revenue,
            item.averageRating,
            item.reviewCount,
          ]
        );
      } else {
        statisticsSheet.push([
          item.title,
          item.price,
          item.bought,
          item.revenue,
          item.averageRating,
          item.reviewCount,
        ]);
      }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(statisticsSheet);
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 11, c: 0 }, e: { r: 11, c: 6 } },
    ];
    worksheet["A1"].v = t("Shop statistic");
    XLSX.utils.book_append_sheet(workbook, worksheet, "List1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    saveAs(
      blob,
      periodStatistics
        ? `${t("Shop statistic between")} ${formatStartDate} ${formatEndDate}.xlsx`
        : `${t("Shop statistic during lifetime")}.xlsx`
    );
    toast.success(`${ii18n.t("File successfuly exported")}`);
  };

  const prepareDataForExcel = (shopStatisticsData: IShopStatisticsData) => {
    return [
      {
        name: t("Total orders"),
        value: shopStatisticsData.totalOrders,
        unit: "pcs",
      },
      {
        name: t("Total bought products"),
        value: shopStatisticsData.totalBoughtProducts,
        unit: "pcs",
      },
      {
        name: t("Total revenue"),
        value: shopStatisticsData.totalRevenue,
        unit: "$",
      },
      {
        name: t("Average order price"),
        value: shopStatisticsData.averageOrderPrice,
        unit: "$",
      },
      {
        name: t("Total reviews"),
        value: shopStatisticsData.totalReviews,
        unit: "pcs",
      },
      {
        name: t("Total users"),
        value: shopStatisticsData.totalUsers,
        unit: "pcs",
      },
      {
        name: t("Total active users"),
        value: shopStatisticsData.totalUsersActive,
        unit: "pcs",
      },
      {
        name: t("Total products"),
        value: shopStatisticsData.totalProducts,
        unit: "pcs",
      },
      {
        name: t("Total categories"),
        value: shopStatisticsData.totalCategories,
        unit: "pcs",
      },
      ...fullProducts.map((product) => {
        return {
          title: product.name,
          price: product.price,
          bought: product.bought,
          revenue: product.revenue,
          averageRating: product.averageRating.toFixed(2),
          reviewCount: product.reviewCount,
        };
      }),
    ];
  };

  const handleDownload = (shopStatisticsData: IShopStatisticsData) => {
    const preparedData = prepareDataForExcel(shopStatisticsData);
    generateExcelFile(preparedData);
  };

  return (
    <section className="personal-page">
      <>
        <h2 className="section__title-center">
          {periodStatistics
            ? `${t("Shop statistic between")} ${formatStartDate} ${formatEndDate}`
            : `${t("Shop statistic during lifetime")}`}
        </h2>
        <div className="shop-statistics__date-container">
          <div className="shop-statistics__date-picker">
            <p>{t("Start date")}</p>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
            />
          </div>
          <div className="shop-statistics__date-picker">
            <p>{t("End date")}</p>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
            />
          </div>
          <Button
            buttonStyle="arrow-up"
            buttonType="button"
            textContent={t("Get statistics between period")}
            buttonHandler={() =>
              getShopStatisticsHandler(formatStartDate, formatEndDate)
            }
          />
        </div>
        <div className="shop-statistics__container">
          <div className="personal-page__basic-info">
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total orders")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total orders")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalOrders ? statistics.totalOrders : 0}
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total bought products")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total bought products")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalBoughtProducts
                ? statistics.totalBoughtProducts
                : 0}
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total revenue")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total revenue")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalRevenue ? statistics.totalRevenue : 0} $
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Average order price")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Average order price")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.averageOrderPrice
                ? statistics.averageOrderPrice
                : 0}{" "}
              $
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total reviews")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total reviews")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalReviews ? statistics.totalReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total users")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalUsers ? statistics.totalUsers : 0}
              &nbsp;&nbsp;&nbsp;,
              {t("including active")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalUsersActive ? statistics.totalUsersActive : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total products")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalProducts ? statistics.totalProducts : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total categories")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalCategories ? statistics.totalCategories : 0}
            </h3>
            <Button
              buttonStyle="arrow-up"
              buttonType="button"
              textContent={t("Generate and save .xlsx")}
              buttonHandler={() => handleDownload(statistics)}
            />
            <GoogleSheetsExport data={prepareDataForExcel(statistics)} />
          </div>
          <AreaChart
            title={t("Revenue chart")}
            xLabel={t("Date")}
            yLabel="$"
            color="#ff5f5f"
          />
          <AreaChart
            title={t("Product sales chart")}
            xLabel={t("Date")}
            yLabel={t("pcs.")}
            color="#7d5fff"
          />
          <AreaChart
            title={t("Review chart")}
            xLabel={t("Date")}
            yLabel={t("pcs.")}
            color="#ffbd5f"
          />
        </div>
        <hr />
        <div className={`personal-page__stat-block`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <h2 className={`nav__link personal-page__tab active-link`}>
                {t("Product statistic")}
              </h2>
            </li>
          </ul>
        </div>
        <hr />
        <GlobalProductStatistics />
      </>
    </section>
  );
};

export default ShopStatistics;
