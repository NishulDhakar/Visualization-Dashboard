'use client';

import React, { useMemo, useState } from 'react';
import {
  Activity,
  Target,
  Zap,
  AlertTriangle,
  Menu,
  MapPin,
  PanelLeftOpen,
  PanelRightOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import SidebarNav from '@/components/layout/SidebarNav';
import TopNavbar from '@/components/layout/TopNavbar';
import FilterPanel from '@/components/filters/FilterPanel';
import EmptyState from '@/components/ui/EmptyState';
import DashboardCard from '@/components/ui/DashboardCard';
import KpiCard from '@/components/kpi/KpiCard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import CityDrilldownModal from '@/components/modals/CityDrilldownModal';
import TimeTrendChart from '@/components/charts/TimeTrendChart';
import IntensityByRegionChart from '@/components/charts/IntensityByRegionChart';
import CategoryMatrixChart from '@/components/charts/CategoryMatrixChart';
import TopicDistributionChart from '@/components/charts/TopicDistributionChart';
import CityBarChart from '@/components/charts/CityBarChart';
import CountryComparisonChart from '@/components/charts/CountryComparisonChart';
import RelevanceByYearChart from '@/components/charts/RelevanceByYearChart';
import IntensityLikelihoodScatter from '@/components/charts/IntensityLikelihoodScatter';
import IntensityScatter from '@/components/charts/IntensityScatter';
import LikelihoodByCountryChart from '@/components/charts/LikelihoodByCountryChart';
import RegionHeatBarChart from '@/components/charts/RegionHeatBarChart';
import SectorPieChart from '@/components/charts/SectorPieChart';
import SectorRadarChart from '@/components/charts/SectorRadarChart';
import SourceBarChart from '@/components/charts/SourceBarChart';

export default function DashboardPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    filters,
    setFilters,
    options,
    loading,
    error,
    resetFilters,
    activeFilterCount,
    records,
  } = useDashboardData();

  const analytics = useDashboardAnalytics(records);
  const drilldownData = useMemo(
    () =>
      selectedCity
        ? analytics.cityData.filter((city) => city.city === selectedCity)
        : analytics.cityData,
    [analytics.cityData, selectedCity]
  );

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <EmptyState title="Error Loading Data" description={error} />
      </div>
    );
  }

  return (
    <div className="dashboard-grid-bg flex min-h-screen text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      <div className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal-700 to-sky-600 text-white shadow-sm">
            <Activity size={16} />
          </div>
          <span className="font-display text-lg font-bold text-slate-900">Blackcoffer</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-20 hidden transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
          desktopSidebarOpen ? 'translate-x-0' : '-translate-x-[115%]'
        }`}
      >
        <SidebarNav className="border-r border-slate-200 bg-white" />
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-[256px] transform-gpu transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(event) => event.stopPropagation()}
        >
          <SidebarNav className="border-r border-slate-200 bg-white" />
        </div>
      </div>

      <main
        className={`mt-16 flex min-w-0 flex-1 flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:mt-0 ${
          desktopSidebarOpen ? 'lg:pl-[276px]' : 'lg:pl-8'
        } ${desktopFilterOpen ? 'lg:pr-[316px]' : 'lg:pr-8'}`}
      >
        <div className="flex-1 overflow-y-auto px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-[1520px]">
            <TopNavbar
              activeFilterCount={activeFilterCount}
              onOpenFilters={() => setMobileFilterOpen(true)}
              onToggleSidebar={() => setDesktopSidebarOpen((open) => !open)}
              onToggleFiltersDesktop={() => setDesktopFilterOpen((open) => !open)}
              sidebarOpen={desktopSidebarOpen}
              filtersOpen={desktopFilterOpen}
            />

            {loading ? (
              <div className="glass-panel mt-8 flex flex-col items-center justify-center rounded-xl py-24">
                <div className="mb-5 h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />
                <p className="text-sm font-medium text-slate-600">Loading dashboard data...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="glass-panel mt-8 rounded-xl py-20">
                <EmptyState
                  title="No Data Matches Criteria"
                  description="Adjust filters or reset to default values."
                />
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={resetFilters}
                    className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <section className="glass-panel rounded-xl p-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Current Dataset</p>
                      <p className="font-display text-xl font-bold text-slate-900">{records.length.toLocaleString()} Records</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Top Region</p>
                      <p className="font-display text-xl font-bold text-slate-900">{analytics.summary.topRegion || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Coverage</p>
                      <p className="font-display text-xl font-bold text-slate-900">
                        {analytics.summary.uniqueCountries} Countries / {analytics.summary.uniqueTopics} Topics
                      </p>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <KpiCard
                    label="Total Data Records"
                    value={analytics.summary.totalRecords.toLocaleString()}
                    icon={Activity}
                    tone="blue"
                  />
                  <KpiCard
                    label="Average Intensity"
                    value={analytics.summary.avgIntensity.toString()}
                    icon={Zap}
                    tone="amber"
                  />
                  <KpiCard
                    label="Average Likelihood"
                    value={analytics.summary.avgLikelihood.toString()}
                    icon={Target}
                    tone="green"
                  />
                  <KpiCard
                    label="Critical Events"
                    value={analytics.summary.highImpactCount.toString()}
                    icon={AlertTriangle}
                    tone="rose"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="space-y-6 xl:col-span-2">
                    <DashboardCard title="Trend Over Time" subtitle="Average intensity and relevance by year">
                      <TimeTrendChart data={analytics.trendData} loading={false} />
                    </DashboardCard>

                    <DashboardCard title="Country Comparison" subtitle="Likelihood and relevance score by country">
                      <CountryComparisonChart data={analytics.countryData} loading={false} />
                    </DashboardCard>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <DashboardCard title="Source Strength" subtitle="Records and intensity by source">
                        <SourceBarChart data={analytics.sourceData} loading={false} />
                      </DashboardCard>
                      <DashboardCard title="PESTLE x SWOT Matrix" subtitle="Category-level strategic signal distribution">
                        <CategoryMatrixChart data={analytics.categoryData} loading={false} />
                      </DashboardCard>
                    </div>
                  </div>

                  <div className="space-y-6">

                                            <DashboardCard title="Likelihood by Country" subtitle="Top countries ranked by likelihood">
                          <LikelihoodByCountryChart data={analytics.countryData} loading={false} />
                        </DashboardCard>
                 
                    <DashboardCard title="Sector Composition" subtitle="Sector contribution to selected dataset">
                      <SectorPieChart data={records} loading={false} />
                    </DashboardCard>
                    <DashboardCard title="Relevance Over Time" subtitle="Yearly relevance trajectory">
                      <RelevanceByYearChart data={analytics.trendData} loading={false} />
                    </DashboardCard>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAdvanced((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    {showAdvanced ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    {showAdvanced ? 'Hide Advanced Insights' : 'Show Advanced Insights'}
                  </button>
                </div>

                {showAdvanced && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                      <div className="space-y-6 xl:col-span-2">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <DashboardCard
                            title="Top Cities / Locations"
                            subtitle="Click a bar to inspect location detail"
                            action={
                              selectedCity ? (
                                <button
                                  onClick={() => setSelectedCity(null)}
                                  className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                                >
                                  Clear
                                </button>
                              ) : null
                            }
                          >
                            <CityBarChart
                              data={analytics.cityData}
                              onCityClick={setSelectedCity}
                              loading={false}
                            />
                          </DashboardCard>
                          <DashboardCard title="Sector Radar" subtitle="Average metric profile by sector">
                            <SectorRadarChart data={analytics.sectorData} loading={false} />
                          </DashboardCard>
                        </div>

                        <DashboardCard title="Intensity vs Likelihood" subtitle="Point cloud for impact relationship">
                          <IntensityLikelihoodScatter data={records} loading={false} />
                        </DashboardCard>

                        <DashboardCard title="Region Heat Bars" subtitle="Intensity weighted visual emphasis by region">
                          <RegionHeatBarChart data={analytics.regionData} loading={false} />
                        </DashboardCard>
                      </div>

                      <div className="space-y-6">
                                              <DashboardCard title="Regional Intensity" subtitle="Comparative intensity by region">
                        <IntensityByRegionChart data={analytics.regionData} loading={false} />
                      </DashboardCard>
                        <DashboardCard title="Raw Intensity Scatter" subtitle="Distribution of intensity-relevance points">
                          <IntensityScatter data={analytics.scatterData} loading={false} />
                        </DashboardCard>


   <DashboardCard title="Topic Distribution" subtitle="Top topics by record share">
                      <TopicDistributionChart data={analytics.topicData} loading={false} />
                    </DashboardCard>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <FilterPanel
        filters={filters}
        options={options}
        onChange={setFilters}
        onReset={resetFilters}
        isOpen={mobileFilterOpen}
        desktopOpen={desktopFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        onToggleDesktop={() => setDesktopFilterOpen((open) => !open)}
      />

      <button
        onClick={() => setDesktopSidebarOpen(true)}
        className={`fixed left-4 top-5 z-30 hidden items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-100 lg:flex ${
          desktopSidebarOpen
            ? 'pointer-events-none -translate-y-2 opacity-0'
            : 'pointer-events-auto translate-y-0 opacity-100'
        }`}
        aria-label="Show sidebar menu"
      >
        <PanelLeftOpen size={15} />
        Menu
      </button>

      <button
        onClick={() => setDesktopFilterOpen(true)}
        className={`fixed right-4 top-5 z-30 hidden items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-100 lg:flex ${
          desktopFilterOpen
            ? 'pointer-events-none -translate-y-2 opacity-0'
            : 'pointer-events-auto translate-y-0 opacity-100'
        }`}
        aria-label="Show filters panel"
      >
        <PanelRightOpen size={15} />
        Filters
      </button>

      <CityDrilldownModal
        open={selectedCity !== null}
        data={drilldownData}
        onClose={() => setSelectedCity(null)}
      />

      {selectedCity && (
        <div className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-md">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="text-teal-700" />
            Inspecting: <strong>{selectedCity}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
