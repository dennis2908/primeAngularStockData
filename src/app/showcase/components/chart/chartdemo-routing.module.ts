import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ChartDemo} from './chartdemo';
import {PieChartDemo} from './piechart/piechartdemo';
import {DoughnutChartDemo} from './doughnutchart/doughnutchartdemo';
import {MultiaxisLine} from './multiaxis/multiaxis';
import {BarChartDemo} from './barchart/barchartdemo';
import {LineChartDemo} from './linechart/linechartdemo';
import {Linechartstyle} from './linechartstyle/linechartstyle';
import {PolarAreaChartDemo} from './polarareachart/polarareachartdemo';
import {RadarChartDemo} from './radarchart/radarchartdemo';
import {ComboChartDemo} from './combochart/comobochartdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'', component: ChartDemo},
            {path:'pie', component: PieChartDemo},
			{path:'multiaxis', component: MultiaxisLine},
            {path:'doughnut', component: DoughnutChartDemo},
            {path:'bar', component: BarChartDemo},
            {path:'line', component: LineChartDemo},
			{path:'linechartstyle', component: Linechartstyle},
            {path:'polararea',component: PolarAreaChartDemo},
            {path:'radar', component: RadarChartDemo},
            {path:'combo', component: ComboChartDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ChartDemoRoutingModule {}
