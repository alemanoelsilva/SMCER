'use strict';

app.controller('ChartOpenHourCtrl', ["$scope", "$state", "SweetAlert", "Circuit", "HoraFechada",
	function($scope, $state, SweetAlert, Circuit, HoraFechada) {

		$scope.grafic = {};
		$scope.circuito = {};
		$scope.circuitos = [];

		$scope.init = function() {
			searchCircuitos(function() {
				gerarGraficoInicial();
			});
			
			$scope.endDateSelect = new Date();
		}

		$scope.init();

		$scope.exibicoes = [
			{nome: "Hora"},
			{nome : "Dia"}
		];
		$scope.exibicao = $scope.exibicoes[0];
		

		function gerarGraficoInicial() {

			$scope.start = new Date();
			$scope.end = new Date();

			var dataStartCustom = new Date($scope.start);
			dataStartCustom.setDate(dataStartCustom.getDate()-1);

			var dataInicial = formatDate(dataStartCustom) + " " + "00:00:00";
			var dataFinal = formatDate($scope.end) + " " + "23:59:59";

			HoraFechada.get({
					dataInicial: dataInicial,
					dataFinal: dataFinal,
					circuito: $scope.circuito.id
				},
				function(consumo) {
					$scope.grafic = consumo;
					grafico();
				},
				function(erro) {
					console.log('erro', erro);
				});
		};

		function searchCircuitos(callback) {
			Circuit.query(
				function(circuitos) {
					$scope.circuitos = circuitos;
					$scope.circuito.nome = circuitos[0].nome;
					$scope.circuito.id = circuitos[0].id;
					callback();
				},
				function(erro) {
					console.log(erro);
				});
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = !$scope.opened;
		};
		$scope.endOpen = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.startOpened = false;
			$scope.endOpened = !$scope.endOpened;
		};
		$scope.startOpen = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.endOpened = false;
			$scope.startOpened = !$scope.startOpened;
		};

		function formatDate(data) {
			//var data = new Date();
			var dia = data.getDate();
			if (dia.toString().length == 1)
				dia = "0" + dia;
			var mes = data.getMonth() + 1;
			if (mes.toString().length == 1)
				mes = "0" + mes;
			var ano = data.getFullYear();
			return ano + "-" + mes + "-" + dia;
		};

		$scope.genGrafico = function(exibicao) {
			$scope.exibicao = exibicao;
			$scope.updateGrafic(false, false);
		};

		$scope.updateGrafic = function(circuito, validaExibicao) {
			if ((!$scope.start || !$scope.end) || ($scope.end < $scope.start))
				return;

			if (!circuito)
				circuito = $scope.circuito;

			var dataStartCustom = new Date($scope.start);
			dataStartCustom.setDate(dataStartCustom.getDate()-1);

			var dataInicial = formatDate(dataStartCustom) + " " + "23:59:59";
			
			var dataFinal = formatDate($scope.end) + " " + "23:59:59";
			var circuito = circuito.id;

			var valid = validaExibicao;

			HoraFechada.get({
					dataInicial: dataInicial,
					dataFinal: dataFinal,
					circuito: circuito
				},
				function(consumo) {
					$scope.grafic = consumo;
					grafico(valid);
				},
				function(erro) {
					console.log('erro', erro);
				});
		};

		function processExibicao(validaExibicao) {

			var qtdHoras = $scope.grafic.data.length

			if (validaExibicao == undefined || validaExibicao == true) {
				if ($scope.exibicao.nome == "Hora") {
					if ((qtdHoras / 24) >= 3) { // Maior que 3 dias
						SweetAlert.swal("Exibição", "A exibição será alterada para (Dia), pois foi selecionado um período maior ou igual á 3 dias", "warning");	
						$scope.exibicao = $scope.exibicoes[1]; // DIA
					}
				} else { // Dia
					if (qtdHoras <= 24) { // Apenas um dia selecionado
						SweetAlert.swal("Exibição", "A exibição será alterada para (Hora), pois foi selecionado um período igual á 1 dia", "warning");	
						$scope.exibicao = $scope.exibicoes[0]; // HORA
					} 
				}

			}

			// Processa somente se foi selecionado o período de um dia
			if ($scope.exibicao.nome == "Dia") {
				var consumo = {
					label: [],
					data: []
				};

				var dia;

				for (var i = 0; i < $scope.grafic.label.length; i++) {

					var check = moment($scope.grafic.label[i], "DD-MM-YYYY HH:mm:ss");

					var month = check.format('M');
					var day   = check.format('D');

					if (day == dia) {
						consumo.data[consumo.data.length-1] += $scope.grafic.data[i];
					} else {
						consumo.label.push(day+"/"+month);
						consumo.data.push($scope.grafic.data[i]);
						dia = day;
					}

				}

				 $scope.grafic = consumo;
			}
		};

		function grafico(validaExibicao) {

			var sumWatts = 0;

			for (var i = 0; i < $scope.grafic.data.length; i++) {
				sumWatts += $scope.grafic.data[i];
			}

			if ($scope.grafic.data.length == 0) {
				SweetAlert.swal("404 -Dados não encontrados", "Tente selecionar um outro período para visualizar o gráfico", "warning");
			} else {
				processExibicao(validaExibicao);	
			}

			
			
			$scope.data = {
				labels: $scope.grafic.label,
				datasets: [{
					label: 'Potência total consumida em (Watts): <span class="big-bold">'+sumWatts+'</span>',
					fillColor: 'rgba(55,67,236,0.1)',
					strokeColor: 'rgba(55,67,236,1)',
					pointColor: 'rgba(55,67,236,1)',
					pointStrokeColor: '#fff',
					pointHighlightFill: '#fff',
					pointHighlightStroke: 'rgba(55,67,236,1)',
					data: $scope.grafic.data
				}]
			};
		};

		$scope.options = {

			maintainAspectRatio: false,

			// Sets the chart to be responsive
			responsive: true,

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: 'rgba(0,0,0,.05)',

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether the line is curved between points
			bezierCurve: false,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 5,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			// Function - on animation progress
			onAnimationProgress: function() {},

			// Function - on animation complete
			onAnimationComplete: function() {},

			//String - A legend template
			legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
		};

	}
]);

app.controller('ChartNowCtrl', ["$scope", "Instantaneo", "Circuit", function($scope, Instantaneo, Circuit) {

	$scope.init = function() {

		Circuit.query(
			function(circuitos) {
				$scope.circuitos = circuitos;

				$scope.circuitos.forEach(function(circuito) {					
					$scope["circuito"+circuito.id] = circuito.nome;
				});


				loadData();
			},
			function(erro) {
				console.log(erro);
			}
		);		

		setInterval(function () {
			loadData();

		}, 10000);		

	};

	function loadData() {
		Instantaneo.query(
			function(data) {

				if ($scope.data.labels.length > 7) {
					$scope.data.labels.splice(0, 1);
					$scope.data.datasets[0].data.splice(0, 1);
					$scope.data.datasets[1].data.splice(0, 1);
					$scope.data.datasets[2].data.splice(0, 1);
					$scope.data.datasets[3].data.splice(0, 1);
					$scope.data.datasets[4].data.splice(0, 1);
				}

				$scope.data.labels.push(data[0].hora);
				$scope.data.datasets[data[0].idCircuito-1].data.push(data[0].potencia);
				$scope.data.datasets[data[1].idCircuito-1].data.push(data[1].potencia);
				$scope.data.datasets[data[2].idCircuito-1].data.push(data[2].potencia);
				$scope.data.datasets[data[3].idCircuito-1].data.push(data[3].potencia);			
				$scope.data.datasets[data[4].idCircuito-1].data.push(data[4].potencia);

				$scope.data0 = {
					labels : $scope.data.labels,
					datasets : new Array($scope.data.datasets[0])
				};
				$scope.data1 = {
					labels : $scope.data.labels,
					datasets : new Array($scope.data.datasets[1])
				};
				$scope.data2 = {
					labels : $scope.data.labels,
					datasets : new Array($scope.data.datasets[2])
				};
				$scope.data3 = {
					labels : $scope.data.labels,
					datasets : new Array($scope.data.datasets[3])
				};
				$scope.data4 = {
					labels : $scope.data.labels,
					datasets : new Array($scope.data.datasets[4])
				};
			},
			function(erro) {
				console.log('erro', erro);
			}
		);
	};

	$scope.init();

	$scope.data = {
		labels: [""],
		datasets: [{
			label: '',
			fillColor: 'rgba(255,129,129,0.1)',
			strokeColor: 'rgba(255,129,129,1)',
			pointColor: 'rgba(255,129,129,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(255,129,129,1)',
			data: [0]
		}, {
			label: '',
			fillColor: 'rgba(95,238,95,0.1)',
			strokeColor: 'rgba(95,238,95,1)',
			pointColor: 'rgba(95,238,95,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(95,238,95,1)',
			data: [0]
		}, {
			label: '',
			fillColor: 'rgba(55,67,236,0.1)',
			strokeColor: 'rgba(55,67,236,1)',
			pointColor: 'rgba(55,67,236,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(55,67,236,1)',
			data: [0]
		}, {
			label: '',
			fillColor: 'rgba(151,187,205,0.1)',
			strokeColor: 'rgba(151,187,205,1)',
			pointColor: 'rgba(151,187,205,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(151,187,205,1)',
			data: [0]
		}, {
			label: '',
			fillColor: 'rgba(55,236,236,0.1)',
			strokeColor: 'rgba(55,236,236,1)',
			pointColor: 'rgba(55,236,236,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(55,236,236,1)',
			data: [0]
		}]
	};

	$scope.options = {

		animation: true,

		animationSteps : 5,

		// Sets the chart to be responsive
		responsive: true,

		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines: true,

		//String - Colour of the grid lines
		scaleGridLineColor: 'rgba(0,0,0,.05)',

		//Number - Width of the grid lines
		scaleGridLineWidth: 1,

		//Boolean - Whether the line is curved between points
		bezierCurve: true,

		//Number - Tension of the bezier curve between points
		bezierCurveTension: 0.4,

		//Boolean - Whether to show a dot for each point
		pointDot: true,

		//Number - Radius of each point dot in pixels
		pointDotRadius: 4,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth: 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius: 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke: true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth: 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill: true,

		// Function - on animation progress
		onAnimationProgress: function() {},

		// Function - on animation complete
		onAnimationComplete: function() {},

		//String - A legend template
		legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
	};

}]);
