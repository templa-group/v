// noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable,JSUnresolvedFunction,BadExpressionStatementJS
// noinspection JSUnresolvedVariable

function crosshairLine(chart, evt, plugin) {
    const {canvas, ctx, chartArea: {left, right, top, bottom}} = chart;

    chart.update("none");

    if (plugin.cursor) {
        if (evt.offsetX >= left && evt.offsetX <= right && evt.offsetY <= bottom && evt.offsetY >= top)
            canvas.style.cursor = plugin.cursor;
        else canvas.style.cursor = "default";
    }

    if (plugin.vertical && evt.offsetX >= left && evt.offsetX <= right) {
        let line = plugin.vertical;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(evt.offsetX, top);
        ctx.lineTo(evt.offsetX, bottom);
        ctx.lineWidth = line.width;
        if (line.color) ctx.strokeStyle = line.color;
        if (line.dash) ctx.setLineDash(line.dash);
        ctx.stroke();
        ctx.restore();
    }

    if (plugin.horizontal && evt.offsetY <= bottom && evt.offsetY >= top) {
        let line = plugin.horizontal;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(left, evt.offsetY);
        ctx.lineTo(right, evt.offsetY);
        ctx.lineWidth = line.width;
        if (line.color)
            ctx.strokeStyle = line.color;
        if (line.dash)
            ctx.setLineDash(line.dash);
        ctx.stroke();
        ctx.restore();
    }
}

export function chartSetup(id, dotnetConfig, jsonConfig) {
    document.getElementById("chart-container-" + id).style.display = 'none';
    document.getElementById("chart-container-" + id).innerHTML = '&nbsp;';
    document.getElementById("chart-container-" + id).innerHTML = '<canvas id="' + id + '"></canvas>';
    document.getElementById("chart-container-" + id).style.display = '';

    let context2d = document.getElementById(id).getContext('2d');
    let config = eval(jsonConfig);
    if (config?.options?.plugins?.tooltip?.callbacks?.hasLabel) {
        config.options.plugins.tooltip.callbacks.hasLabel = undefined;
        config.options.plugins.tooltip.callbacks.label = function (ctx) {
            let dsIndex = -1;
            let dIndex = -1;
            let vl = 0;
            if (ctx.datasetIndex >= 0 && ctx.dataIndex >= 0) {
                dsIndex = ctx.datasetIndex;
                dIndex = ctx.dataIndex;
                vl = chart.data.datasets[dsIndex].data[dIndex];
            }
            return DotNet.invokeMethod('TemplaGroup.Chart', 'TooltipCallbacksLabel', dotnetConfig, [dsIndex, dIndex, vl]);
        };
    }

    if (config?.options?.plugins?.tooltip?.callbacks?.hasCustomTitle) {
        config.options.plugins.tooltip.callbacks.hasCustomTitle = undefined;
        config.options.plugins.tooltip.callbacks.title = function (ctx) {
            let dsIndex = -1;
            let dIndex = -1;
            let vl = 0;
            if (ctx[0].datasetIndex >= 0 && ctx[0].dataIndex >= 0) {
                dsIndex = ctx[0].datasetIndex;
                dIndex = ctx[0].dataIndex;
                vl = chart.data.datasets[dsIndex].data[dIndex];
            }
            return DotNet.invokeMethod('TemplaGroup.Chart', 'TitleCallbacks', dotnetConfig, [dsIndex, dIndex, vl]);
        };
    }

    let crosshair_plugin = config?.options?.plugins?.crosshair;
    if (config?.options?.plugins?.crosshair) {
        config.options.plugins.crosshair = undefined;
    }

    if (config?.options?.hasOnHoverAsync) {
        config.options.hasOnHoverAsync = undefined;
        config.options.onHover = function (evt, activeElements, ch) {
            const canvasPosition = Chart.helpers.getRelativePosition(evt, ch);

            // Substitute the appropriate scale IDs
            const dataX = ch.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = ch.scales.y.getValueForPixel(canvasPosition.y);

            let rtn = {
                DataX: dataX,
                DataY: dataY
            };

            return DotNet.invokeMethodAsync('TemplaGroup.Chart', 'OnHoverAsync', dotnetConfig, rtn);
        };
    }

    if (config?.options?.groupXAxis) {
        config.options.groupXAxis = undefined;

        config.options.scales.x.ticks.callback = function (label) {
            let realLabel = this.getLabelForValue(label)
            return realLabel.split(";")[0];
        }

        config.options.scales.xAxis2.type = 'category';
        config.options.scales.xAxis2.grid.drawOnChartArea = false;
        config.options.scales.xAxis2.ticks.callback = function (label) {
            let realLabel = this.getLabelForValue(label)
            let lbl = realLabel.split(";")[1];
            let position = realLabel.split(";")[2];

            if (position !== undefined && position !== '') return lbl;
            return "";
        }
    }

    if (config?.options?.groupYAxis) {
        config.options.groupYAxis = undefined;

        config.options.scales.y.ticks.callback = function (label) {
            let realLabel = this.getLabelForValue(label)
            return realLabel.split(";")[0];
        }

        config.options.scales.yAxis2.type = 'category';
        config.options.scales.yAxis2.grid.drawOnChartArea = false;
        config.options.scales.yAxis2.ticks.callback = function (label) {
            let realLabel = this.getLabelForValue(label)
            let lbl = realLabel.split(";")[1];
            let position = realLabel.split(";")[2];

            if (position !== undefined && position !== '') return lbl;
            return "";
        }
    }

    if (typeof ChartDataLabels !== 'undefined' && config?.options?.registerDataLabels) {
        // noinspection PointlessBooleanExpressionJS
        config?.options?.registerDataLabels === undefined;
        Chart.register(ChartDataLabels);
    }
    if (typeof ChartDataLabels !== 'undefined' && !config?.options?.registerDataLabels) {
        config?.options?.registerDataLabels === undefined;
        Chart.unregister(ChartDataLabels);
    }

    let chart = new Chart(context2d, config);
    if (crosshair_plugin) {
        chart.canvas.addEventListener("mousemove", (evt) => {
            crosshairLine(chart, evt, crosshair_plugin);
        });
    }

    chart.options.onClick = function (evt, activeElements, chart) {
        if (activeElements.length > 0) {
            let dsIndex = activeElements[0].datasetIndex;
            let dIndex = activeElements[0].index;
            let vl = 0;

            if (dsIndex >= 0 && dIndex >= 0) {
                vl = chart.data.datasets[dsIndex].data[dIndex];
            }

            let rtn = {
                DatasetIndex: dsIndex,
                DataIndex: dIndex,
                Value: vl
            };

            DotNet.invokeMethodAsync('TemplaGroup.Chart', 'OnClickAsync', dotnetConfig, rtn);
        }
    };

    chart.options.plugins.legend.onClick = function (e, legendItem) {
        let rtn = {
            LegendIndex: legendItem.index,
            LegendText: legendItem.text
        };

        DotNet.invokeMethodAsync('TemplaGroup.Chart', 'OnLegendClickAsync', dotnetConfig, rtn);
    };
}

export function addData(id, label, dataset, data) {
    let chart = Chart.getChart(id);

    if (label !== null)
        chart.data.labels.push(label);
    if (dataset < chart.data.datasets.length)
        chart.data.datasets[dataset].data.push(data);

    chart.update();
}

export function addNewDataset(id, dataset) {
    let chart = Chart.getChart(id);
    chart.data.datasets.push(dataset);
    chart.update();
}